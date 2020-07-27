import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const spyNewsService = jasmine.createSpyObj('NewsService',{
      getAllData: () => {
        return of({})
      }
    })
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'xtcodingassignment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('xtcodingassignment');
  });

  it('should increase page count when call next function for pagination', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.page = 2;
    app.next();
    expect(app.page).toBe(3);
  })

  it('should decrease page count when call previous function for pagination', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.page = 2;
    app.prev();
    expect(app.page).toBe(1);
  });

});
