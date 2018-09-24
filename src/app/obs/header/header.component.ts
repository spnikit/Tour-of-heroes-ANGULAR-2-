import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ServerService } from '../server.service';
import { Response } from '@angular/http';




const Users: { name: string }[] = [
  { name: 'Paulo' },
  { name: 'Jordano' },
  { name: 'Michael' }
]

@Component({
  selector: 'app-headerObs',
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="container" style="margin-top: 30px;">

      <div class="row">
        <div class="col-xs-12">
        <h2>{{suka | async}}</h2>
          <input type="text" class="form-control" #serverName>
          <button 
          class="btn btn-primary" 
          (click)="onAddServer(serverName.value)">Add Server</button>
          <hr>
          <button class="btn btn-primary" (click)="onSaveServers()">Save Servers</button>
          <button class="btn btn-default" (click)="onGetServers()">Get Servers</button>
          <hr>
          <ul class="list-group">
            <li class="list-group-item" *ngFor="let server of servers">
              {{server?.name}} - (ID: {{server?.id}})
            </li>
          </ul>
        </div>
      </div>

    </div>
  `,
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('serverName') serverNameInput: ElementRef;
  serversUpdated = new Subject<{ id: number, name: string }[]>();
  subscription: Subscription;
  servers = [
    { id: this.generateId(), name: 'server1' },
    { id: this.generateId(), name: 'server2' },
    { id: this.generateId(), name: 'server3' }
  ]

  suka = this.serverService.getSuka();

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.subscription = this.serversUpdated
      .subscribe((servers) => this.servers = servers);
  }

  onAddServer(serverName: string): void {
    const id = this.generateId();

    this.servers.push({ id, name: serverName });
    this.serverNameInput.nativeElement.value = '';
    this.serversUpdated.next(this.servers);

  }

  onSaveServers() {
    this.serverService.saveServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (err) => console.warn(err)
      )
  }

  onGetServers() {
    this.serverService.getServers()
      .subscribe(
        (servers: any[]) => {
          console.log(servers);
        },

        (err) => console.log(err)
      )
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


