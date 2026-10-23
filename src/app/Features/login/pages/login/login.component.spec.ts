import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { OauthService, provideAuthConfig } from 'security-auth-ui';
import { LoginComponent } from './login.component';

describe('LoginComponent with security-auth-ui', () => {
  let auth: jasmine.SpyObj<OauthService>;
  let fixture: ComponentFixture<LoginComponent>;
  let navigate: jasmine.Spy;
  let returnUrl: string | null;

  beforeEach(async () => {
    sessionStorage.removeItem('redirectAfterLogin');
    returnUrl = null;
    auth = jasmine.createSpyObj('OauthService', ['isLoggedIn', 'loginWithGoogle']);
    auth.isLoggedIn.and.returnValue(of(false));
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]), provideNoopAnimations(),
        provideAuthConfig({ defaultAfterLoginRoute: '/restaurantes' }),
        { provide: OauthService, useValue: auth },
        { provide: ActivatedRoute, useValue: { snapshot: {
          get queryParamMap() { return convertToParamMap(returnUrl === null ? {} : { returnUrl }); },
        } } },
      ],
    }).compileComponents();
    navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
  });

  afterEach(() => sessionStorage.removeItem('redirectAfterLogin'));

  function render(): LoginComponent {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('enables Google login when the session is absent', () => {
    const component = render();
    expect(component.checkingSession()).toBeFalse();
    fixture.nativeElement.querySelector('.botao-google').click();
    expect(auth.loginWithGoogle).toHaveBeenCalled();
    expect(sessionStorage.getItem('redirectAfterLogin')).toBe('/restaurantes');
  });

  it('returns authenticated users to the protected destination', () => {
    auth.isLoggedIn.and.returnValue(of(true));
    returnUrl = '/restaurantes?category=1';
    render();
    expect(navigate).toHaveBeenCalledWith('/restaurantes?category=1', { replaceUrl: true });
  });

  it('recovers the destination after the OAuth round trip', () => {
    auth.isLoggedIn.and.returnValue(of(true));
    sessionStorage.setItem('redirectAfterLogin', '/restaurantes?category=2');
    render();
    expect(navigate).toHaveBeenCalledWith('/restaurantes?category=2', { replaceUrl: true });
    expect(sessionStorage.getItem('redirectAfterLogin')).toBeNull();
  });

  it('rejects external return destinations', () => {
    auth.isLoggedIn.and.returnValue(of(true));
    returnUrl = '//example.com';
    render();
    expect(navigate).toHaveBeenCalledWith('/restaurantes', { replaceUrl: true });
  });

  it('shows a session failure and allows another login attempt', () => {
    auth.isLoggedIn.and.returnValue(throwError(() => ({ status: 500 })));
    render();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.botao-google').disabled).toBeFalse();
  });

});
