import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'product-destroy',
  templateUrl: './product-destroy.component.html',
  styleUrls: ['./product-destroy.component.css']
})
export class ProductDestroyComponent implements OnInit {
  @Input() uuid: string = null;
  @Output() destroy: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  destroyProduct() {
    console.log('emmit destroy', this.uuid);
    this.destroy.emit(this.uuid);
  }

}
