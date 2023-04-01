#!/bin/bash

# Get the folder name from the command line argument
folder_name=$1

cd src/resources

# Create the folder with the given name
mkdir "$folder_name"


#--------------------- CREATING INTERFACE----------------#
touch "$folder_name/${folder_name}_interface.ts"

echo "export interface I${folder_name^} {
  _id: string;
  userId: string;
}

export interface I${folder_name^}CreateReq {}

export interface I${folder_name^}UpdateReq {}" > "$folder_name/${folder_name}_interface.ts"

#--------------------- CREATING MODEL----------------#

touch "$folder_name/${folder_name}_model.ts"

echo "import { Schema, model, Document } from 'mongoose';
import { I${folder_name^} } from './${folder_name}_interface';

const ${folder_name^}Schema = new Schema<I${folder_name^}>(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

${folder_name^}Schema.index({ _id: 1, userId: 1 });

export default model<I${folder_name^} & Document>('${folder_name^}', ${folder_name^}Schema);
" > "$folder_name/${folder_name}_model.ts"

#--------------------- CREATING REPOSITORY----------------#
touch "$folder_name/${folder_name}_repository.ts"

echo "import { Service } from 'typedi';
import { I${folder_name^} } from './${folder_name}_interface';
import ${folder_name^}Model from './${folder_name}_model';

@Service()
class ${folder_name^}Repository {
  private ${folder_name}Model = ${folder_name^}Model;

  public async create${folder_name^}(userId: string, data: any): Promise<I${folder_name^} | null> {
    data.userId = userId;
    return this.${folder_name}Model.create(data);
  }

  public async get${folder_name^}(userId: string, ${folder_name}Id: string): Promise<I${folder_name^} | null> {
    return this.${folder_name}Model.findOne({
      _id: ${folder_name}Id,
      userId: userId,
    });
  }

  public async update${folder_name^}(userId: string, ${folder_name}Id: string, data: any): Promise<I${folder_name^} | null> {
    return this.${folder_name}Model.findOneAndUpdate(
      {
        _id: ${folder_name}Id,
        userId: userId,
      },
      data,
      { new: true },
    );
  }

  public async delete${folder_name^}(id: string, userId: string): Promise<I${folder_name^} | null> {
    return this.${folder_name}Model.findOneAndDelete({
      _id: id,
      userId: userId,
    });
  }
}

export default ${folder_name^}Repository;
" > "$folder_name/${folder_name}_repository.ts"

#--------------------- CREATING SERVICE----------------#
touch "$folder_name/${folder_name}_service.ts"

echo "import ${folder_name^}Repository from './${folder_name}_repository';
import { Inject, Service } from 'typedi';
import { I${folder_name^}, I${folder_name^}CreateReq, I${folder_name^}UpdateReq } from './${folder_name}_interface';
import HttpException from '@/utils/exceptions/http_exceptions';
import locale from '@/constants/locale_constants';

@Service()
class ${folder_name^}Service {
  constructor(@Inject() private ${folder_name}Repo: ${folder_name^}Repository) {}

  public async create${folder_name^}(userId: string, ${folder_name}CreateReq: I${folder_name^}CreateReq): Promise<I${folder_name^} | Error> {
    const ${folder_name} = await this.${folder_name}Repo.create${folder_name^}(userId, ${folder_name}CreateReq);
    if (!${folder_name}) throw new HttpException(422, 'Failed to create ${folder_name}. Please try again later');
    return ${folder_name};
  }

  public async get${folder_name^}(userId: string, ${folder_name}Id: string): Promise<I${folder_name^} | Error> {
    const ${folder_name} = await this.${folder_name}Repo.get${folder_name^}(userId, ${folder_name}Id);
    if (!${folder_name}) throw new HttpException(404, 'Couldnt find ${folder_name}');
    return ${folder_name};
  }

  public async update${folder_name^}(
    userId: string,
    ${folder_name}Id: string,
    ${folder_name}UpdateReq: I${folder_name^}UpdateReq,
  ): Promise<I${folder_name^} | Error> {
    const updated${folder_name^} = await this.${folder_name}Repo.update${folder_name^}(userId, ${folder_name}Id, ${folder_name}UpdateReq);
    if (!updated${folder_name^}) throw new HttpException(404, 'Couldnt find ${folder_name}');
    return updated${folder_name^};
  }

  public async delete${folder_name^}(userId: string, ${folder_name}Id: string): Promise<I${folder_name^} | Error> {
    const deleted${folder_name^} = await this.${folder_name}Repo.delete${folder_name^}(userId, ${folder_name}Id);
    if (!deleted${folder_name^}) throw new HttpException(404, 'Couldnt find ${folder_name}');
    return deleted${folder_name^};
  }
}

export default ${folder_name^}Service;
" > "$folder_name/${folder_name}_service.ts"


#--------------------- CREATING VALIDATION----------------#
touch "$folder_name/${folder_name}_validation.ts"

echo "import Joi from 'joi';

const create${folder_name^} = Joi.object({});

const update${folder_name^} = Joi.object({});

export default {
  create${folder_name^},
  update${folder_name^},
};
" > "$folder_name/${folder_name}_validation.ts"

#--------------------- CREATING CONTROLLER----------------#
touch "$folder_name/${folder_name}_controller.ts"

echo "import { Router, Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import Controller from '@/utils/interfaces/controller_interface';
import HttpException from '@/utils/exceptions/http_exceptions';
import validationMiddleware from '@/middleware/validation_middleware';
import validate from './${folder_name}_validation';
import ${folder_name^}Service from './${folder_name}_service';
import authenticated from '@/middleware/authenticated_middleware';

@Service()
class ${folder_name^}Controller implements Controller {
  public path = '/${folder_name}s';
  public router = Router();

  constructor(@Inject() private ${folder_name}Service: ${folder_name^}Service) {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(\`\${this.path}\`, authenticated, validationMiddleware(validate.create${folder_name^}), this.create${folder_name^});
    this.router.get(\`\${this.path}/:${folder_name}Id\`, authenticated, this.get${folder_name^});
    this.router.patch(
      \`\${this.path}/:${folder_name}Id\`,
      authenticated,
      validationMiddleware(validate.update${folder_name^}),
      this.update${folder_name^},
    );
    this.router.delete(\`\${this.path}/:${folder_name}Id\`, authenticated, this.delete${folder_name^});
  }

  private create${folder_name^} = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(201).json(await this.${folder_name}Service.create${folder_name^}(req.user._id, req.body));
    } catch (error: any) {
      next(error);
    }
  };

  private get${folder_name^} = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(200).json(await this.${folder_name}Service.get${folder_name^}(req.user._id, req.params.${folder_name}Id));
    } catch (error: any) {
      next(error);
    }
  };

  private update${folder_name^} = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(200).json(await this.${folder_name}Service.update${folder_name^}(req.user._id, req.params.${folder_name}Id, req.body));
    } catch (error: any) {
      next(error);
    }
  };

  private delete${folder_name^} = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(200).json(await this.${folder_name}Service.delete${folder_name^}(req.user._id, req.params.${folder_name}Id));
    } catch (error: any) {
      next(error);
    }
  };
}

export default ${folder_name^}Controller;
" > "$folder_name/${folder_name}_controller.ts" 


cd ..
cd ..