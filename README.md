# 📱 StartupMatch
> A mobile matching app connecting startup founders and developers.

---

## Table of contents
- [Features](#features)
- [Stack](#stack)
- [Architecture](#architecture)
- [Get Started](#get-started)

---

## Features
- Sign up and sign in with JWT authentication
- Choose your profile type: Visionary and Builder
- Create, update and delete startup mission
- Swipe to like or dislike startup mission

---

## Stack
| Layer | Technology |
|---|---|
| Mobile | React Native |
| Backend | NestJS + TypeScript |
| Database | PostgreSQL |
| Cloud | AWS — EC2, EKS, RDS, S3 |
| IaC | Terraform |
| CI/CD | GitHub Actions |

---

## Architecture
```mermaid
graph TD
    MobileApp([React Native App\niOS & Android])
    MobileApp -->|HTTPS REST| ALB

    subgraph VPC [VPC 10.0.0.0/16 — eu-west-3]
        subgraph Public [Public subnet 10.0.1.0/24]
            ALB[Application Load Balancer]
            Ingress[Nginx Ingress Controller]
            NAT[NAT Gateway]
        end
        subgraph Private [Private subnet 10.0.2.0/24 — EKS Cluster]
            subgraph Node [EC2 Worker Node — t3.medium]
                Pod1[Pod: NestJS API — replica 1 :3000]
                Pod2[Pod: NestJS API — replica 2 :3000]
            end
            RDS[(RDS PostgreSQL\nSingle-AZ :5432)]
        end
        ALB --> Ingress
        Ingress -->|port 3000| Pod1
        Ingress -->|port 3000| Pod2
        Pod1 -->|port 5432| RDS
        Pod2 -->|port 5432| RDS
        Pod1 -.->|outbound| NAT
        Pod2 -.->|outbound| NAT
    end

    S3[AWS S3\nstatic assets]
    Pod1 -->|VPC Endpoint| S3
    Pod2 -->|VPC Endpoint| S3

    subgraph CICD [CI/CD Pipeline]
        GitHub[GitHub\npush on main] --> Actions[GitHub Actions\nlint + test + Docker build]
        Actions -->|push image| GHCR[GHCR\nGitHub Container Registry]
        GHCR -->|kubectl rolling update| Node
    end

    subgraph IaC [Infrastructure as Code]
        Terraform[Terraform\nvpc · eks · ec2 · rds · s3 · alb · nat]
    end
```
> Single-AZ to reduce costs on a demo project.
> In production: 2 AZ, Auto Scaling Group and RDS Multi-AZ.
> AWS infrastructure destroyed after demo — redeploy anytime with `terraform apply`.

---

## Get Started
⏳ WORK IN PROGRESS ⏳
TODO: 
for prisma: migrate, client, seed
doc: expo.dev react navigation, react native, nestJS 
