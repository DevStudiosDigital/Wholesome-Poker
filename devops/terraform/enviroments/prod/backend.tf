terraform {
  backend "s3" {
    bucket = "wholesome-poker-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

