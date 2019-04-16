import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

interface UserProps {
    avatar: string,
    company: string,
    id: string,
    name: string,
    openTasks: string,
}
class newUser {
    avatar: '';
    company: '';
    id: '';
    name: '';
    openTasks: '';
}
@Component({
    selector: 'user-page',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    activeTab = 'All members';
    userService = new UserService();
    users: UserProps[] = [];
    isModalOpen: boolean = false;
    selectedUser: UserProps = new newUser();
    modalTitle: string = '';
    actionBtn: string = '';
    ngOnInit() {
        this.userService.getUsers().subscribe((userList: UserProps[]) => this.users = userList);
    }
    setActiveTab(activeTab: string) {
        this.activeTab = activeTab;
    }
    onClickProfile(user: UserProps) {
        this.isModalOpen = true;
        this.selectedUser = user;
        this.modalTitle = 'Profile Update';
        this.actionBtn = 'Update';
    }
    onClickAddNewMember() {
        this.isModalOpen = true;
        this.modalTitle = 'Add a new member';
        this.actionBtn = 'Save';
    }
    onClickClose() {
        this.isModalOpen = false;
        this.selectedUser = new newUser();
    }
    onChangeInput(field: string, e: any) {
        this.selectedUser[field] = e.target.value;
    }
    onSaveOrUpdateMember() {
        this.userService.createOrUpdateUser(this.selectedUser).subscribe(() => {
            this.userService.getUsers().subscribe((userList: any[]) => this.users = userList);
            this.onClickClose();
        });
    }
    onClickDeleteMember(user: UserProps) {
        this.isModalOpen = true;
        this.selectedUser = user;
        this.modalTitle = 'Delete member';
        this.actionBtn = 'Delete';
    }
    onDeleteUser() {
        this.userService.deleteUser(this.selectedUser).subscribe(() => {
            this.userService.getUsers().subscribe((userList: any[]) => this.users = userList);
            this.onClickClose();
        });
    }
}