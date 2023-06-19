---
date: 2022-06-09
title: 'What is terraform and how to get started with it'
shortTitle: 'What is terraform and how to get started with it'
description: 'What is terraform and how to get started with it'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: how-to-get-start-with-terraform-with-aws
categories:
  - terraform
  - aws-cdk 
  - aws
tags:
  - terraform
  - aws-cdk 
  - aws
---


Terraform is an open-source infrastructure as code (IaC) tool developed by HashiCorp. It allows you to define and manage your infrastructure resources in a declarative manner using configuration files. With Terraform, you can provision, configure, and manage a wide range of cloud infrastructure resources across multiple cloud providers, including AWS, Azure, Google Cloud Platform, and more.

Terraform operates based on the concept of "desired state," where you define the desired configuration of your infrastructure resources in a declarative language called HashiCorp Configuration Language (HCL). Rather than manually creating and managing individual resources, Terraform enables you to describe the desired infrastructure state in a configuration file. It then automatically provisions and manages the resources to match that desired state.

Key features and benefits of Terraform include:

1. **Infrastructure as Code (IaC)**: Terraform allows you to treat your infrastructure as code, providing version control, collaboration, and repeatability benefits. Infrastructure configurations can be stored, reviewed, and shared like any other code, enabling infrastructure changes to be managed through version control systems.

2. **Multi-Cloud and Cross-Provider Support**: Terraform supports multiple cloud providers, enabling you to manage resources across different providers using the same configuration syntax. This flexibility allows you to adopt a multi-cloud or hybrid cloud strategy and easily migrate between providers if needed.

3. **Declarative Configuration**: With Terraform, you define the desired state of your infrastructure resources rather than specifying step-by-step instructions for how to create them. Terraform figures out the most efficient way to provision and manage the resources based on your desired configuration, handling the complexity of resource dependencies and provisioning order.

4. **Infrastructure Dependency Management**: Terraform automatically manages and tracks dependencies between resources. It determines the order in which resources need to be created or modified based on their dependencies, ensuring the correct provisioning sequence.

5. **Plan and Preview Changes**: Terraform provides a planning phase that allows you to preview the changes it will make to your infrastructure before applying them. This feature helps you avoid unintended modifications and provides a safety net by showing the expected changes and their impact.

6. **State Management**: Terraform keeps track of the current state of your infrastructure by maintaining a state file. This file represents the actual resources that have been created and their current configuration. Terraform uses this state to plan and apply changes incrementally and track the desired state against the actual state of your infrastructure.

7. **Ecosystem and Community**: Terraform benefits from a vibrant ecosystem and community. It provides a rich set of built-in and community-contributed modules that encapsulate reusable infrastructure configurations. This allows you to leverage existing modules to provision complex architectures and accelerate your infrastructure provisioning process.

Terraform is a powerful tool that helps streamline infrastructure management, improve collaboration, and increase automation in your infrastructure provisioning process. It empowers teams to easily create, modify, and destroy infrastructure resources while ensuring consistency and reproducibility across environments.


1. **Install Terraform**: Visit the official Terraform website (https://www.terraform.io/) and download the appropriate version for your operating system. Install Terraform by following the provided instructions.

2. **Set Up AWS Credentials**: If you plan to use Terraform with AWS, ensure you have AWS credentials set up. This involves creating an AWS account, generating an Access Key ID and Secret Access Key, and configuring the AWS Command Line Interface (CLI) with these credentials. Terraform will use the same credentials for interacting with AWS resources.

3. **Create a Terraform Configuration File**: Start by creating a new directory for your Terraform project. Inside this directory, create a file with a `.tf` extension, such as `main.tf`. This file will contain the Terraform configuration code.

4. **Write Terraform Configuration**: Open the `main.tf` file in a text editor and start writing your Terraform configuration. The configuration is written in HashiCorp Configuration Language (HCL) and describes the desired state of your infrastructure. Define resources, providers, variables, and other settings as required for your project.

5. **Initialize the Terraform Project**: Open a terminal or command prompt, navigate to your Terraform project directory, and run the command `terraform init`. This command initializes the project, downloads the necessary providers, and sets up the backend configuration.

6. **Plan and Apply Changes**: After initializing the project, you can run `terraform plan` to see a preview of the changes Terraform will make to your infrastructure. This step is optional but highly recommended. To apply the changes, run `terraform apply` and confirm the changes when prompted. Terraform will create or modify resources according to your configuration.

7. **Explore Additional Terraform Commands**: Terraform provides a range of commands to manage your infrastructure. Some commonly used commands include `terraform destroy` to tear down the created resources, `terraform state` to manage the state file, and `terraform output` to view outputs from your Terraform configuration.

8. **Learn and Iterate**: Terraform is a powerful tool with many features. Explore the Terraform documentation (https://www.terraform.io/docs/index.html) to learn about advanced concepts, modules, remote state, and more. Iterate on your Terraform configuration to match your infrastructure requirements and scale your project.

Remember, Terraform is not limited to AWS. It supports various cloud providers, including Azure, Google Cloud Platform, and many others. Adjust your provider and configuration based on your chosen cloud provider.

By following these steps, you'll be on your way to managing your infrastructure as code with Terraform. Happy provisioning!

Certainly! Here are the steps with corresponding code examples:

1. **Create a Project Directory**: Start by creating a new directory for your Terraform project.

2. **Install Terraform**: Download and install the appropriate version of Terraform for your operating system.

3. **Initialize a Terraform Configuration**: Open a terminal or command prompt and navigate to your project directory. Run the following command to initialize the project:

```shell
terraform init
```

4. **Write Terraform Configuration**: Create a new file named `main.tf` in your project directory and open it in a text editor. Write your Terraform configuration in this file. Here's an example of creating an AWS EC2 instance:

```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c94855ba95c71c99"
  instance_type = "t2.micro"
}
```

5. **Provider Configuration**: Configure the provider(s) you'll be using. In this example, we're configuring the AWS provider:

```hcl
provider "aws" {
  region = "us-west-2"
  access_key = "YOUR_AWS_ACCESS_KEY"
  secret_key = "YOUR_AWS_SECRET_KEY"
}
```

Replace `YOUR_AWS_ACCESS_KEY` and `YOUR_AWS_SECRET_KEY` with your actual AWS access key and secret key.

6. **Plan and Apply Changes**: Run the following commands to see a plan of the changes and apply them:

```shell
terraform plan
terraform apply
```

7. **Manage State**: By default, Terraform stores the state locally in a file named `terraform.tfstate`. You can also configure remote state storage. Here's an example using AWS S3 for remote state storage:

```hcl
terraform {
  backend "s3" {
    bucket = "your-bucket-name"
    key    = "path/to/terraform.tfstate"
    region = "us-west-2"
  }
}
```

Replace `your-bucket-name` with the name of your AWS S3 bucket.

8. **Version Control**: Initialize a Git repository in your project directory to track changes:

```shell
git init
```

These steps provide a basic setup for your Terraform project. You can continue expanding your configuration by adding more resources, modules, or variables as needed.

Note: Ensure you have the necessary provider credentials (access key, secret key, etc.) to interact with your chosen cloud provider.

Remember to refer to the official Terraform documentation and adapt the code examples to your specific requirements. Happy Terraforming!

## Terraform and AWS CDK

Terraform and AWS CDK (Cloud Development Kit) are both popular infrastructure as code (IaC) tools used for managing and provisioning cloud resources. However, there are some key differences between them:

1. **Language and Configuration**: Terraform uses its own declarative language called HashiCorp Configuration Language (HCL). It provides a simple syntax for defining infrastructure resources and their configurations. On the other hand, AWS CDK allows developers to use familiar programming languages such as TypeScript, Python, Java, C#, and JavaScript to define their infrastructure resources using object-oriented programming constructs.

2. **Provider Support**: Terraform is designed to be provider-agnostic and supports multiple cloud providers, including AWS, Azure, Google Cloud Platform, and more. It allows you to write configurations that can be applied across different providers. AWS CDK, as the name suggests, is primarily focused on AWS and provides a higher level of abstraction specifically for working with AWS services. It offers AWS-specific constructs and takes advantage of AWS CloudFormation under the hood.

3. **Abstraction Level**: Terraform operates at a lower level of abstraction compared to AWS CDK. It treats infrastructure resources as "black boxes" and focuses on provisioning and managing those resources based on the desired state. AWS CDK, on the other hand, provides a higher level of abstraction, allowing you to define infrastructure resources using constructs that represent AWS service components directly. This can make it easier to work with AWS-specific services and leverage their specific features.

4. **Ease of Use**: AWS CDK provides a more intuitive and developer-friendly experience for those familiar with programming languages. It offers code autocompletion, IDE support, and the ability to leverage programming constructs, which can help streamline development and reduce potential errors. Terraform, although not as code-centric, provides a simpler and more concise syntax for writing infrastructure configurations.

5. **Maturity and Ecosystem**: Terraform has been in the market for a longer time and has a well-established ecosystem with a large community and extensive library of providers and modules. It supports a wide range of cloud providers and has a rich set of resources and integrations. AWS CDK, being more focused on AWS, has a growing ecosystem and community. It benefits from the wider AWS ecosystem and integrates seamlessly with AWS services and best practices.

Ultimately, the choice between Terraform and AWS CDK depends on your specific use case, familiarity with programming languages, and the level of abstraction you prefer. If you're working primarily with AWS and prefer a programming language-based approach with AWS-specific constructs, AWS CDK may be a good fit. If you require multi-cloud support or prefer a simpler, declarative configuration language, Terraform may be a better choice.