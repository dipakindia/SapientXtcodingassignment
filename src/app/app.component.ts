import { Component } from '@angular/core';
import { NewsService } from './news.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xtcodingassignment';
  public newsList:any = [];
  public page = 0;
  public loading: Boolean = false;
  public loaded: Boolean = false;
  public Highcharts = Highcharts;
  public chartOptions: any = {
    chart: {
        type: 'line'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Votes'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'ID',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 23.3, 18.3, 13.9, 9.6]

    }]
};
  constructor(private news: NewsService){
    this.loadData(this.page);
  }

  loadData(page){
    this.loading = true;
    this.news.getAllData(page).subscribe(data => {
      this.loading = false;
      this.loaded = true;
      let hideList =this.news.getHideNews();
      this.newsList = data['hits'].map(data => {
        let votes = this.news.getVotes()
        if(votes[data.objectID]){
          data.points = votes[data.objectID];
        }
        return data;
      }).filter(data => !hideList.includes(data.objectID));
      let ids = this.newsList.map(data => data.objectID);
      let points = this.newsList.map(data => data.points);
      this.chartOptions.xAxis.categories = ids;
      this.chartOptions.series = [{
        name: 'ID',
        data: points

    }]
    console.log('this.chartOptions', this.chartOptions)
    });
  }
  next(){
    this.page = this.page + 1;
    this.loadData(this.page);
  }
  prev(){
    this.page = this.page - 1;
    this.loadData(this.page);
  }
  hideNews(id){
    console.log(id)
    this.news.hideNews(id);
    this.loadData(this.page);
  }
  doVote(id, count){
    this.news.UpVotes(id, count);
    this.loadData(this.page);
  }
}
