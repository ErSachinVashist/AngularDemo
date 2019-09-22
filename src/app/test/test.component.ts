import {Component, OnInit, Input,Output,EventEmitter} from '@angular/core';

@Component({
    selector: 'app-test',
    template: `
        <div>
            <!--apply single dynamic class-->
            <h1 [class.class1]="hasError">Hello {{fetchUser()}} in {{parentData}}</h1>
            <!--applying multiple dynamic classes-->
            <!--binding properties with 'bind' attrubute-->
            <!--sending value from input to class with #var-->
            <!--using [] for attribute binding-->
            <input #myInput [class]="hasError?'class1 class2':'class2'" bind-type="type" value={{fetchUser()}} [disabled]="isDisabled"/>
            <!--dom event listing and sending input value to class-->
            <button (click)="fetchInput(myInput.value)">SAVE</button>
            <br/>
            <!--use ngModel for two way data-binding-->
            <input [(ngModel)]="user"/>
            <!--applying multiple class with ngClass-->
            <h1 [ngClass]="classSelector">{{fetchUser()}}</h1>
            <!--applying style properties-->
            <h1 [style.fontSize]="'50px'">{{user}}</h1>
            <button (click)="clickAction(user,$event)">Click Me</button>
            <br/>
            <button (click)="user=user==='vashist'?'sachin':'vashist'">Click Me</button>
            <!--applying multiple style with ngStyle-->
            <h1 [ngStyle]="styleSelector">{{user}}</h1>
            <!--Conditional hide/show components-->
            <!--use then or 'nothing' syntax to show when if condition is satisfied-->
            <!--use else syntax to show when if condition is not satisfied-->
            <!--ng-template is container of other html element to be rendered in else condition # is reference-->
            <div *ngIf="user==='sachin';then thenBlock; else elseBlock"></div>
            <ng-template #thenBlock>
                <h1>Hie {{user}}, Itz you!!</h1>
            </ng-template>
            <ng-template #elseBlock>
                <h1>You are not SACHIN</h1>
            </ng-template>
            <!--ng-switch for switch case implementation-->
            <div [ngSwitch]="user">
                <h1 *ngSwitchCase="'sachin'">This is owner first name</h1>
                <h1 *ngSwitchCase="'vashist'">This is owner last name</h1>
                <h1 *ngSwitchDefault>This is random</h1>
            </div>
            <!--ng-for takes array and iterate over it. index as i, first,last, odd, even for filters-->
            <div *ngFor="let u of userArray;index as i;first as isFirst;">
                <h1>{{i + 1}} : hello {{u | uppercase}} {{isFirst && 'you are on top'}}</h1>
            </div>
          <h1>{{date | date : 'short'}}</h1>
        </div>`,
    styleUrls: ['./test.component.css'],
    styles: [`
        .class1 {
            color: red;
        }

        .class2 {
            font-style: italic;
        }
    `]
})
export class TestComponent implements OnInit {
  // to fetch input from parent component or @Input('parentData') public title;
  @Input() public parentData;
  @Output() public childData=new EventEmitter();
    public user = 'sachin';
    public userArray = [];
    public type = 'text';
    public inputClass = 'class1';
    public hasError = true;
    public date = new Date();
    public isDisabled = false;
    public classSelector = {
        class1: !this.hasError,
        class2: this.isDisabled,
    };
    public styleSelector = {
        fontSize: '50px',
        color: 'purple'
    };

    constructor() {
    }

    ngOnInit() {
    }

    clickAction(user, event) {
        this.user = user === 'vashist' ? 'sachin' : 'vashist';
        this.childData.emit(`${user} is saying hello to project`)
    }

    fetchUser() {
        return this.user;
    }

    fetchInput(user) {
        this.user = user;
        this.userArray.push(user);
    }

}
