import { Injectable } from '@angular/core';
import { AbstractEndUserAgreementGuard } from './abstract-end-user-agreement.guard';
import { Observable } from 'rxjs';
import { EndUserAgreementService } from './end-user-agreement.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

/**
 * A guard redirecting users to the end agreement page when the user agreement cookie hasn't been accepted
 */
@Injectable()
export class EndUserAgreementCookieGuard extends AbstractEndUserAgreementGuard {

  constructor(
    protected endUserAgreementService: EndUserAgreementService,
    protected router: Router,
  ) {
    super(router);
  }

  /**
   * True when the user agreement cookie has been accepted
   */
  hasAccepted(): Observable<boolean> {
    return this.endUserAgreementService.isUserAgreementEnabled().pipe(
      map((isUserAgreementEnabled) => isUserAgreementEnabled ? this.endUserAgreementService.isCookieAccepted() : true),
    );
  }

}
