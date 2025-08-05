# Overview

ChittyIntel is an advanced legal intelligence platform designed for sophisticated analysis of complex litigation cases involving ARIBIA LLC, a real estate investment company. The platform provides multi-perspective stakeholder analysis, interactive timeline visualization, and comprehensive legal position assessment.

The system analyzes legal documents, financial records, and business communications to provide intelligence across different viewpoints including business defense, lender perspectives, former member claims, legal neutral analysis, and international compliance considerations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Extensive use of Radix UI primitives for accessible components
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js (indicated by build scripts)
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful architecture (project named "rest-express")
- **File Processing**: Handles document uploads and management for attached assets
- **Session Management**: PostgreSQL session store with connect-pg-simple

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database schema management
- **Document Storage**: File system storage for attached assets (PDFs, images, text files)

## Authentication and Authorization
- Session-based authentication with PostgreSQL session storage
- Role-based access control for document management
- Secure file access controls for sensitive legal documents

## External Dependencies
- **Database**: Neon Database (PostgreSQL serverless)
- **Development**: Vite for frontend bundling and development
- **Build Tools**: ESBuild for server-side bundling
- **Document Processing**: Handles various file formats including PDF, text, and images
- **Replit Integration**: Custom Replit plugins for error handling and development tools

The system is designed to handle sensitive legal and financial documents with proper organization, search capabilities, and secure access controls. The architecture supports a complex business structure with multiple legal entities and international operations.