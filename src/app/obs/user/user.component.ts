import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  template: `
    <h4>User</h4>
    <p>User with id = {{id}} was loaded</p>

  `,
})
export class UserComponent implements OnInit {

  id: number;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });
  }

}
