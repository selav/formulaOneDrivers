import { Component, OnInit, Input } from '@angular/core';
import { DriverProfileItem } from '../driverProfileItem';

@Component({
  selector: 'app-driver-data',
  template: `
    <div class="driver-data-wrapper">
      <span>
      {{driverData?.code}}
      </span>
      <span>
        {{driverData?.full_name}}
      </span>
      <span>
      Age:{{getAge(driverData?.dob)}}
      </span>
      <span>
      Nationality:{{driverData?.nationality}}
      </span>
    </div>
  `,
  styles: [`
    .driver-data-wrapper{
      margin-left:10px;
      font-family:cursive;
      color: red;
      font-weight: bold;
      display:inline-block;
    }

    .driver-data-wrapper span:not(:last-child):after {
        content: "|";
        color: #dccaca;
        font-weight: bold;
        margin: 0 5px;
     }
  `
  ]
})
export class DriverDataComponent implements OnInit {

  constructor() { }

  @Input() driverData:DriverProfileItem;

  ngOnInit(): void {
  }

  getAge = (dateString) =>{
    const ageDifMs = Date.now() - new Date(dateString).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);

}

}
