import { Component, OnInit }  from '@angular/core';
import { User }               from "../../models/user";
import { Router }             from "@angular/router";
import { UserService }        from "../../services/user.service";
import { AuthService }        from "../../services/auth.service";

@Component({
  selector: 'menu-aside',
  templateUrl: 'menu-aside.component.html',
  styleUrls: ['menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {
  private current_url: string;
  private links: Array<any> = [
    {
      "title": "Home",
      "icon": "dashboard",
      "link": ['/']
    },
    {
      "title": "Devices",
      "icon": "snowflake-o",
      "sublinks": [
        {
          "title": "Device Registration",
          "link": ['/page/device-reg']
        }
      ]
    },
    {
      "title": "Documentation",
      "icon": "book",
      "sublinks": [
        {
          "title": "ng2-admin-lte",
          "link": 'https://github.com/TwanoO67/ng2-admin-lte',
	  "target": "_blank"
        },
        {
          "title": "Bootstrap 3",
          "link": ['http://bootstrapdocs.com/v3.0.3/docs/'],
	  "external": true,
	  "target": "_blank"
        }
      ]
    },
    {
      "title": "Client",
      "icon": "usd",
      "link": ['/client']
    },
    {
      "title": "Sub menu",
      "icon": "link",
      "sublinks": [
        {
          "title": "Page 2",
          "link": ['/page/2'],
        },
        {
          "title": "Page 3",
          "link": ['/page/3'],
        }
      ]
    }
  ];

  constructor(private _user_serv : UserService, public router: Router, private auth: AuthService){
    //recuperation de l'url courrante
    this.router.events.subscribe((evt) => this.current_url = evt.url );
  }

  ngOnInit() {
    
  }

}
