import {
    Component,
    ViewChild,
    ViewEncapsulation,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    OnInit,
    OnChanges,
    OnDestroy,
} from '@angular/core';

const Chartist = require('chartist');

@Component({
  selector: 'app-chartist-chart',
  encapsulation: ViewEncapsulation.None,
  styles: [require('chartist/dist/chartist.css'), require('./chartist-chart.scss')],
  templateUrl: './chartist-chart.html',
  inputs: [
	  'chartType:		chartType',
	  'chartData:		chartData',
	  'chartOptions:	chartOptions',
	  'chartResponsive:	chartResponsive',
	  'chartClass:		chartClass'
  ],
  outputs: [
	  'onChartReady:	onChartReady'
  ]
})
export class ChartistChartComponent implements OnInit {
	chartType:string;
	chartData:Object;
	chartOptions:Object;
	chartResponsive:Object;
	chartClass:string;
	onChartReady = new EventEmitter<any>();

	@ViewChild('chartistChart') private _selector:ElementRef;

	private chart;

	ngAfterViewInit() {

		this.chart = new Chartist[this.chartType](
			this._selector.nativeElement,
			this.chartData,
			this.chartOptions,
			this.chartResponsive);
		this.onChartReady.emit(this.chart);
	}

	ngOnInit() {
	}


	ngOnChanges() {
		if (this.chart) {
			(<any>this.chart).update(this.chartData, this.chartOptions);
		}
	}

	ngOnDestroy():void {
		if (this.chart) {
			this.chart.detach();
		}
	}
}
