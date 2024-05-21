locals {
  private_subnets  = [for i, n in var.availability_zones : cidrsubnet(var.vpc_cidr, 4, i + 8)]
  public_seed_cidr = cidrsubnet(var.vpc_cidr, 2, length(var.availability_zones))
  public_subnets   = [for i, n in var.availability_zones : cidrsubnet(local.public_seed_cidr, 2, i)]
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.4.0"
  name    = "${var.environment}-vpc"
  azs     = var.availability_zones
  cidr    = var.vpc_cidr

  private_subnets              = local.private_subnets
  public_subnets               = local.public_subnets
  enable_dns_hostnames         = true
  enable_dns_support           = true
  enable_nat_gateway           = false
  single_nat_gateway           = true
  public_dedicated_network_acl = true
  database_dedicated_network_acl = true
}
