import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdviceService } from '../shared/services/advice.service'; // Import the service
import { Advice } from '../shared/types/advice.type'; // Import the type

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Advice>();

  @Input() gameId: number | null = null;
  @Input() gameName: string | null = null;

  reviewData: Partial<Advice> = {
    author: '',
    note: 5,
    content: ''
  };

  constructor(private adviceService: AdviceService) {}

  closeDialog() {
    this.close.emit();
  }

  submitReview(event: Event) {
    event.preventDefault();
    console.log("Game ID:", this.gameId);
    console.log("Review Data:", this.reviewData); 

    if (this.reviewData.author && this.reviewData.content && this.gameId !== null) {
        // Prepare the advice object
        const adviceToSubmit: Advice = {
          author: this.reviewData.author,
          content: this.reviewData.content,
          note: this.reviewData.note,
        };

        // Call the service to add the comment
        this.adviceService.addComment(this.gameId, adviceToSubmit).subscribe(
            (createdAdvice) => {
                this.submit.emit(createdAdvice);
                this.closeDialog();
            },
            (error) => {
                console.error('Error adding comment:', error);
            }
        );
    } else {
        console.error("Review submission failed: Missing required fields.");
    }
}
}
