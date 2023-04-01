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
}" > "$folder_name/${folder_name}_interface.ts"

#--------------------- CREATING MODEL----------------#

touch "$folder_name/${folder_name}_model.ts"

echo "import { Schema, model, Document } from 'mongoose';
import { I${folder_name^} } from './${folder_name}_interface';


const ${folder_name^}Schema = new Schema<I${folder_name^}>(
  {

  },
  {
    timestamps: true,
  },
);

export default model<I${folder_name^} & Document>('${folder_name^}', ${folder_name^}Schema);" > "$folder_name/${folder_name}_model.ts"

#--------------------- CREATING REPOSITORY----------------#
touch "$folder_name/${folder_name}_repository.ts"

echo "import { Service } from 'typedi';
import { I${folder_name^} } from './${folder_name}_interface';
import ${folder_name^}Model from './${folder_name}_model';

@Service()
class ${folder_name^}Repository {
  private ${folder_name}Model = ${folder_name^}Model;
}

export default ${folder_name^}Repository;" > "$folder_name/${folder_name}_repository.ts"

#--------------------- CREATING SERVICE----------------#
touch "$folder_name/${folder_name}_service.ts"

echo "import ${folder_name^}Repository from './${folder_name}_repository';
import { Inject, Service } from 'typedi';

@Service()
class ${folder_name^}Service {
  constructor(@Inject() private ${folder_name}Repo: ${folder_name^}Repository) {}
}

export default ${folder_name^}Service;" > "$folder_name/${folder_name}_service.ts"


#--------------------- CREATING VALIDATION----------------#
touch "$folder_name/${folder_name}_validation.ts"

echo "import Joi from 'joi';

export default {};" > "$folder_name/${folder_name}_validation.ts"

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
    
  }
}

export default ${folder_name^}Controller;" > "$folder_name/${folder_name}_controller.ts" 


cd ..
cd ..