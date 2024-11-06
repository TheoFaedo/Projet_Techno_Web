import { Injectable } from '@nestjs/common';

@Injectable()
export class IgdbService {
  private bearer_token: string;
  private last_time_auth: Date;
  private token_duration: number;

  async authenticate() {
    if (this.isAuthenticated()) {
      return;
    }

    let response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_APP_ID}&client_secret=${process.env.IGDB_APP_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST',
      },
    ).then((response) => response.json());

    if (!response.access_token || !response.expires_in) {
      throw new Error('Failed to authenticate');
    }

    this.bearer_token = response.access_token;
    this.last_time_auth = new Date();
    this.token_duration = response.expires_in - 600; // 10 minutes adding to be safe
  }

  isAuthenticated() {
    if (!this.bearer_token) {
      return false;
    }
    if (
      (new Date().getTime() - this.last_time_auth.getTime()) / 1000 >
      this.token_duration
    ) {
      return false;
    }
    return true;
  }

  /*
        Returns the cheapest price of a game by using cheapshark api (another api)
    */
  async searchPrice(steamAppId: number): Promise<number | null> {
    return fetch(
      `https://www.cheapshark.com/api/1.0/games?steamAppID=${steamAppId}`,
    )
      .then((res) => res.json())
      .then((res) => res?.[0]?.cheapest || null);
  }

  get bearerToken() {
    return this.bearer_token;
  }

  createRequest(): IgdbQuery {
    return new IgdbQuery(this);
  }
}

export class IgdbQuery {
  private endpoint: string;
  private _filters: RequestFilter[] = [];
  private sortField?: string;
  private sortOrder?: string;
  private searchWords?: string;
  private request_limit = 10;
  private request_fields = '*';

  private igdb_service: IgdbService;

  constructor(igdb_service: IgdbService) {
    this.igdb_service = igdb_service;
  }

  games() {
    this.endpoint = 'games';
    return this;
  }

  basicGamesFields() {
    this.addfields(
      'id',
      'name',
      'cover.url',
      'first_release_date',
      'summary',
      'slug',
      'websites.url',
      'websites.category',
      'game_modes.name',
      'genres.name',
      'platforms.name',
    );
    return this;
  }

  sort(sortField: string, sortOrder: string) {
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    return this;
  }

  filter(filter: RequestFilter) {
    this._filters.push(filter);
    return this;
  }

  filters(filters: RequestFilter[]) {
    filters.forEach((filter) => {
      this._filters.push(filter);
    });
    return this;
  }

  search(searchWords: string) {
    this.searchWords = searchWords;
    return this;
  }

  limit(request_limit: number) {
    this.request_limit = request_limit;
    return this;
  }

  allfields() {
    this.request_fields = '*';
    return this;
  }

  addfields(...fields: string[]) {
    fields.forEach((field) => {
      if (this.request_fields === '*') {
        this.request_fields = field;
        return;
      }
      this.request_fields += ',' + field;
    });

    return this;
  }

  async execute() {
    await this.igdb_service.authenticate();

    let parsedBody = `fields ${this.request_fields};`;

    if (this._filters && this._filters.length > 0) {
      parsedBody += 'where ';
      this._filters.forEach((filter) => {
        parsedBody += `${filter.variable} ${filter.operator} ${filter.value} & `;
      });
      parsedBody = parsedBody.slice(0, -2);
      parsedBody += ';';
    }

    if (this.searchWords) {
      parsedBody += `search "${this.searchWords}";`;
    }

    if (this.sortField && this.sortOrder) {
      parsedBody += `sort ${this.sortField} ${this.sortOrder};`;
    }

    parsedBody += `limit ${this.request_limit < 50 ? this.request_limit : 50};`;

    console.log(parsedBody);

    return fetch(`https://api.igdb.com/v4/${this.endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_APP_ID,
        Authorization: `Bearer ${this.igdb_service.bearerToken}`,
      },
      body: parsedBody,
    }).then((response) => response.json());
  }
}

export class RequestFilter {
  private readonly _variable: string;
  private readonly _operator: string;
  private readonly _value: string;

  static readonly operators = ['=', '!=', '>', '<', '>=', '<=', '~'];

  private constructor(variable: string, operator: string, value: string) {
    this._variable = variable;
    this._operator = operator;
    this._value = value;
  }

  static create(variable: string, operator: string, value: string) {
    if (!variable || !operator || !value) {
      throw new Error('Invalid filter');
    }

    if (!RequestFilter.operators.includes(operator)) {
      throw new Error('Invalid operator');
    }

    return new RequestFilter(variable, operator, value);
  }

  get variable() {
    return this._variable;
  }

  get operator() {
    return this._operator;
  }

  get value() {
    return this._value;
  }
}
