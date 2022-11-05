import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ColorChangeDirective } from './color-change.directive';
import { OptionsPipePipe } from './options-pipe.pipe';
import { ManageOptionComponent } from './components/manage-option/manage-option.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColorChangeDirective,
    OptionsPipePipe,
    ManageOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
