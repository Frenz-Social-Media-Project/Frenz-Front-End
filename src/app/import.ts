import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {  CookieService } from "ngx-cookie-service";
import { CookieModule } from "ngx-cookie";
export const modules = [
  HttpClientModule,
  BrowserModule,
  FormsModule,
  CookieModule.withOptions()];
  CookieService
  NgModule

export const services = [];
