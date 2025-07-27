# Admin System Documentation

## Overview
Frontend-only admin system for managing prompt templates with CSV import capabilities.

## Features
- **Mock Authentication**: admin@brainwave.com / admin123
- **CSV Bulk Import**: Upload, validate, and preview prompt data
- **Plan Gating**: ANON, FREE, PREMIUM tier management
- **Data Management**: Local storage persistence with demo data

## CSV Format

### Required Headers (exact order):
```
slug,title,short_description,content,category_slug,category_name,category_description,visibility,status,tags,is_featured,sort_order,version
```

### Field Specifications:
- **visibility**: ANON | FREE | PREMIUM
- **status**: DRAFT | PUBLISHED | ARCHIVED  
- **tags**: Pipe (|) or comma (,) separated
- **booleans**: "true" or "false" (case insensitive)
- **numbers**: Integer values for sort_order and version

## Routes
- `/admin/login` - Authentication
- `/admin` - Dashboard overview
- `/admin/prompts` - Prompt management
- `/admin/prompts/bulk-import` - CSV upload interface
- `/admin/categories` - Category management

## Plan Gating Logic
- **ANON**: Can see ANON visibility + PUBLISHED status only
- **FREE**: Can see ANON,FREE visibility + PUBLISHED status only  
- **PREMIUM**: Can see all visibility levels + PUBLISHED status only
- **DRAFT/ARCHIVED**: Never shown publicly

## Demo Data
Use "Reset Demo Data" button to restore default sample content.