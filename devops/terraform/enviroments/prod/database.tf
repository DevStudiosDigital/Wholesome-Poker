module "postgresql" {
  source = "../../modules/rds"

  allocated_storage       = 10
  backup_retention_period = 7
  backup_window           = "22:44-23:14"
  db_name                 = var.db_name
  db_password             = var.db_password
  db_username             = var.db_username
  engine                  = "postgres"
  engine_version          = "15.5"
  environment             = var.environment
  instance_class          = var.db_instance_class
  maintenance_window      = "mon:00:26-mon:00:56"
  max_allocated_storage   = 50
  multi_az                = false
  project_name            = module.globals.project_name
  publicly_accessible     = true
  skip_final_snapshot     = false
  storage_encrypted       = true
  subnet_ids              = module.vpc.public_subnets
  vpc_id                  = module.vpc.vpc_id

  ingress_rds_sg = [
    {
      port            = 5432
      protocol        = "tcp"
      cidr_blocks     = ["0.0.0.0/0"]
      security_groups = []
    }
  ]
}