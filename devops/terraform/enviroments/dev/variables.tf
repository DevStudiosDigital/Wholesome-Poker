variable "environment" {
  description = "Name of a current environment"
  type        = string
}

variable "region" {
  description = "Environment region"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
}

variable "db_instance_class" {
  description = "Database instance type class"
  type        = string
}


variable "vpc_cidr" {
  description = "CIDR for a VPC"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zone names"
  type        = list(string)
}