import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../model/Role';
import { RoleService } from './role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  allRoles: Role[] | undefined;

  constructor(private Router: Router, private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.findAllRoles().subscribe(data => {
      this.allRoles = data;
    })
  }

}
