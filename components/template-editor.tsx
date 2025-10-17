"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, FileText, Sparkles } from "lucide-react"

const defaultTemplates = [
  {
    id: "default",
    name: "Default Template",
    description: "Standard PR description format",
    template: `## Summary
{ai_summary}

## Changes
{changes_list}

## Testing
{testing_notes}

## Related Issues
{related_issues}`,
  },
  {
    id: "feature",
    name: "Feature Template",
    description: "For new feature development",
    template: `## Feature Description
{ai_summary}

## Implementation Details
{implementation_details}

## User Impact
{user_impact}

## Screenshots
{screenshots}

## Testing Checklist
{testing_checklist}`,
  },
  {
    id: "bugfix",
    name: "Bug Fix Template",
    description: "For bug fixes and patches",
    template: `## Bug Description
{bug_description}

## Root Cause
{root_cause}

## Solution
{solution}

## Testing
{testing_notes}

## Regression Prevention
{regression_notes}`,
  },
]

const availableVariables = [
  { key: "{ai_summary}", description: "AI-generated summary of changes" },
  { key: "{changes_list}", description: "List of file changes" },
  { key: "{testing_notes}", description: "Testing instructions" },
  { key: "{related_issues}", description: "Related issue numbers" },
  { key: "{implementation_details}", description: "Technical implementation details" },
  { key: "{user_impact}", description: "Impact on end users" },
  { key: "{screenshots}", description: "Visual changes placeholder" },
  { key: "{testing_checklist}", description: "Testing checklist items" },
  { key: "{bug_description}", description: "Bug description" },
  { key: "{root_cause}", description: "Root cause analysis" },
  { key: "{solution}", description: "Solution description" },
  { key: "{regression_notes}", description: "Regression prevention notes" },
]

export function TemplateEditor() {
  const [templates, setTemplates] = useState(defaultTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [templateName, setTemplateName] = useState(selectedTemplate.name)
  const [templateDescription, setTemplateDescription] = useState(selectedTemplate.description)
  const [templateContent, setTemplateContent] = useState(selectedTemplate.template)

  const handleSave = () => {
    const updatedTemplates = templates.map((t) =>
      t.id === selectedTemplate.id
        ? { ...t, name: templateName, description: templateDescription, template: templateContent }
        : t,
    )
    setTemplates(updatedTemplates)
    // Here you would typically save to backend/localStorage
  }

  const handleNewTemplate = () => {
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: "New Template",
      description: "Custom template",
      template: "## Description\n{ai_summary}\n\n## Changes\n{changes_list}",
    }
    setTemplates([...templates, newTemplate])
    setSelectedTemplate(newTemplate)
    setTemplateName(newTemplate.name)
    setTemplateDescription(newTemplate.description)
    setTemplateContent(newTemplate.template)
  }

  const handleDelete = () => {
    if (templates.length > 1) {
      const filtered = templates.filter((t) => t.id !== selectedTemplate.id)
      setTemplates(filtered)
      setSelectedTemplate(filtered[0])
      setTemplateName(filtered[0].name)
      setTemplateDescription(filtered[0].description)
      setTemplateContent(filtered[0].template)
    }
  }

  const insertVariable = (variable: string) => {
    setTemplateContent(templateContent + "\n" + variable)
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PR Template Editor</h1>
        <p className="text-muted-foreground mt-1">Customize report templates for AI-generated Pull Requests</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Template List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Templates</CardTitle>
            <CardDescription>Select or create a template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template)
                  setTemplateName(template.name)
                  setTemplateDescription(template.description)
                  setTemplateContent(template.template)
                }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedTemplate.id === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{template.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{template.description}</p>
                  </div>
                </div>
              </button>
            ))}
            <Button onClick={handleNewTemplate} variant="outline" className="w-full gap-2 mt-4 bg-transparent">
              <Plus className="h-4 w-4" />
              New Template
            </Button>
          </CardContent>
        </Card>

        {/* Template Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Edit Template</CardTitle>
                <CardDescription>Customize your PR description format</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                {!selectedTemplate.id.startsWith("default") && (
                  <Button onClick={handleDelete} variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Input
                id="template-description"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Brief description of this template"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-content">Template Content</Label>
              <Textarea
                id="template-content"
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
                placeholder="Enter your template using variables like {ai_summary}"
                className="font-mono text-sm min-h-[300px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Available Variables
              </Label>
              <div className="flex flex-wrap gap-2">
                {availableVariables.map((variable) => (
                  <button key={variable.key} onClick={() => insertVariable(variable.key)} className="group">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {variable.key}
                    </Badge>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click on a variable to insert it into your template. The AI will fill these with relevant content.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
