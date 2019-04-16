import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
const isDev = process.env.NODE_ENV !== 'production';

if (!isDev) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);