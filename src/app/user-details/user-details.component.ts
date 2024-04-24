import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterModule, MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  userId: any;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    this.userId = (this.route.snapshot.paramMap.get('id'));
    this.userService.users.subscribe(users => {
      this.user = users.filter(user => user.id.value === this.userId)[0]
    });
   
  }
}
