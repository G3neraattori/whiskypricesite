import {Component, OnInit} from '@angular/core';
import {AppRoutingModule} from '../../app-routing.module';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
