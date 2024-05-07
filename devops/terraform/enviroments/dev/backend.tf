terraform {
  backend "s3" {
    bucket = "wholesome-poker-terraform-state"
    key    = "dev/terraform.tfstate"
    region = "us-east-1"
  }
}

