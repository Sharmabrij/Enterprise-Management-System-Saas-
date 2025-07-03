import { Request, Response, NextFunction } from 'express';

interface TenantRequest extends Request {
  tenant?: {
    id: string;
    name: string;
  };
}

export const tenantMiddleware = (req: TenantRequest, res: Response, next: NextFunction) => {
  try {
    // Extract tenant from header (X-Tenant-ID)
    const tenantId = req.headers['x-tenant-id'] as string;
    
    // Or extract from subdomain
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    
    if (tenantId) {
      req.tenant = {
        id: tenantId,
        name: tenantId // You might want to look this up from a database
      };
    } else if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
      req.tenant = {
        id: subdomain,
        name: subdomain
      };
    }
    
    next();
  } catch (error) {
    next(error);
  }
}; 