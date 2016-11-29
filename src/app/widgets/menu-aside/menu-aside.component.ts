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
      "title": "Device List",
      "link": ['/pages/user/device-list'],
      "icon": "list"
    },
    {
      "title": "Admin",
      "icon": "wrench",
      "sublinks": [
        {
          "title": "Device Registration",
          "link": ['/pages/admin/device-reg'],
          "icon": "snowflake-o"
        }
      ]
    },
    {
      "title": "Platform Tools",
      "icon": "stethoscope",
      "sublinks": [
        {
          "title": "HAProxy Stats",
          "link": ['http://iot.zulicreative.com:9000/'],
          "icon": "balance-scale",
	  "external": true,
	  "target": "_blank"
        },
        {
          "title": "Mongo Client",
          "link": ['http://iot.zulicreative.com:3001/'],
          "icon": "database",
	  "external": true,
	  "target": "_blank"
        },
        {
          "title": "Alexa Skill Editor",
          "link": ['https://developer.amazon.com/edw/home.html#/skill/amzn1.ask.skill.aa461cfb-a251-4351-ba3c-9cd2f2f607ca/en_US/info'],
          "icon": "amazon",
	  "external": true,
	  "target": "_blank"
        },
        {
          "title": "Alexa Schema",
          "link": ['https://iot.zulicreative.com/alexa/iot?schema'],
          "icon": "code",
	  "external": true,
	  "target": "_blank"
        },
        {
          "title": "Alexa Utterances",
          "link": ['https://iot.zulicreative.com/alexa/iot?utterances'],
          "icon": "microphone",
	  "external": true,
	  "target": "_blank"
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
          "icon": "code",
	  "external": true,
	  "target": "_blank"
        },
        {
          "title": "Bootstrap 3",
          "link": ['http://bootstrapdocs.com/v3.0.3/docs/'],
          "icon": "css3",
	  "external": true,
	  "target": "_blank"
        },
        {
          "title": "Font Awesome Icons",
          "link": ['http://fontawesome.io/icons/'],
          "icon": "font-awesome",
	  "external": true,
	  "target": "_blank"
        },
        {
          "title": "NodeMCU",
          "link": ['https://nodemcu.readthedocs.io/en/dev/'],
          "icon": "microchip",
	  "external": true,
	  "target": "_blank"
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
