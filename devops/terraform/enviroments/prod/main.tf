module "globals" {
  source = "../../modules/globals"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      project     = module.globals.project_name
      environment = var.environment
      created_by  = "terraform"
    }
  }
}