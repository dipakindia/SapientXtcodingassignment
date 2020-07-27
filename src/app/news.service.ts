import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tick } from "@angular/core/testing";
import { isGeneratedFile } from "@angular/compiler/src/aot/util";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  public api_url = "https://hn.algolia.com/api/v1/search?query=news";
  listHideNewsList = [];
  constructor(private http: HttpClient) {}

  getAllData(page) {
    return this.http.get(this.api_url + "&page=" + page);
  }

  getHideNews() {
    if (localStorage.getItem("hideNewsList")) {
      this.listHideNewsList = JSON.parse(localStorage.getItem("hideNewsList"));
    }
    return this.listHideNewsList;
  }

  hideNews(id) {
    if (localStorage.getItem("hideNewsList")) {
      this.listHideNewsList = JSON.parse(localStorage.getItem("hideNewsList"));
    }
    this.listHideNewsList.push(id);
    localStorage.setItem("hideNewsList", JSON.stringify(this.listHideNewsList));
  }
  UpVotes(id, count) {
    let voteObj = JSON.parse(localStorage.getItem("newsVote")) ? JSON.parse(localStorage.getItem("newsVote")) : {};
    if (voteObj && voteObj[id]) {
      voteObj[id] = voteObj[id] + 1;
    } else {
      voteObj[id] = '';
      voteObj[id] = count + 1;
    }
    localStorage.setItem("newsVote", JSON.stringify(voteObj));
  }
  getVotes() {
    return JSON.parse(localStorage.getItem("newsVote"));
  }
}
