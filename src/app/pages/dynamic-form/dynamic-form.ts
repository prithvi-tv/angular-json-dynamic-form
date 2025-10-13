import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dynamic-form',
  imports: [InputTextModule, FloatLabelModule, FormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm {
  public inputValue = '';
}
