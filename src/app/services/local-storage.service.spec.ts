import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        { provide: PLATFORM_ID, useValue: 'browser' }, // Mocking the platform id for browser
      ],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item in local storage', () => {
    spyOn(localStorage, 'setItem');
    service.setItem('testKey', 'testValue');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should get item from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testValue');
    const value = service.getItem('testKey');
    expect(value).toBe('testValue');
  });

  it('should remove item from local storage', () => {
    spyOn(localStorage, 'removeItem');
    service.removeItem('testKey');
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it('should clear local storage', () => {
    spyOn(localStorage, 'clear');
    service.clear();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
