import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

  getUsers() {
    return ajax.get('http://5caf1f0bf7850e0014628f2c.mockapi.io/api/User').pipe(
      map(res => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        return res.response;
      }),
      catchError(err => of([]))
    );
  }
  
  createOrUpdateUser(user: any) {
    if (user.id) {
      return this.updateUserById(user);
    }
    return this.createUser(user);
  }

  createUser(user: any) {
    return ajax.post(`http://5caf1f0bf7850e0014628f2c.mockapi.io/api/User/`, user).pipe(
      map(res => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        return res.response;
      }),
      catchError(err => of([]))
    );
  }

  updateUserById(user: any) {
    return ajax.put(`http://5caf1f0bf7850e0014628f2c.mockapi.io/api/User/${user.id}`, user).pipe(
      map(res => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        return res.response;
      }),
      catchError(err => of([]))
    );
  }

  deleteUser(user: any) {
    return ajax.delete(`http://5caf1f0bf7850e0014628f2c.mockapi.io/api/User/${user.id}`).pipe(
      map(res => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        return res.response;
      }),
      catchError(err => of([]))
    );
  }

}
