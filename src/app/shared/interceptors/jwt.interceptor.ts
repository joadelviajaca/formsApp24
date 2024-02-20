import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  if (!req.url.includes('cloudinary')) {
    
    const token = localStorage.getItem('token');
    if (token){
      req = req.clone({
        setHeaders: { "x-token": token }
    });
    }
  }
  return next(req);
};
