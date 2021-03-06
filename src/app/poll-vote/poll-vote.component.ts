import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements AfterViewInit {
  @Input() voted: boolean;
  @Input() options: string[];
  @Input() results: number[];
  @Input() question: string;
 
  voteForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      selected: this.fb.control('',[Validators.required])
    })
   }

  ngAfterViewInit(): void {
    if (this.voted) {
      this.generateChart();
    }
  }

  submitForm()
  {
    console.log(this.voteForm.value);
  }
  generateChart() {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data: this.results,
        },],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      legend: {
        show: false,
        
      },
      xaxis: {
        categories: this.options,
      },
    };

    const chart = new ApexCharts(document.getElementById('poll-results'), options);
    chart.render()
  }
}
