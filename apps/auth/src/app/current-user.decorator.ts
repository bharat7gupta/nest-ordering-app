import { ExecutionContext, createParamDecorator } from "@nestjs/common";

 
 export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        if (context.getType() === 'http') {
            return context.switchToHttp().getRequest().user;
        }

        return null;
    }
)
