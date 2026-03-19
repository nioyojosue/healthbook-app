'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Modal,
  useModalState,
  Badge,
  BadgeGroup,
} from '@/components/ui';
import { Search, Download, Trash2 } from 'lucide-react';

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const modalState = useModalState();

  const tableData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Active',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Pending',
      date: '2024-01-16',
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      status: 'Inactive',
      date: '2024-01-17',
    },
  ];

  const columns = [
    { key: 'name', label: 'Name', width: '25%' },
    { key: 'email', label: 'Email', width: '30%' },
    {
      key: 'status',
      label: 'Status',
      width: '20%',
      render: (value) => (
        <Badge
          variant={
            value === 'Active'
              ? 'success'
              : value === 'Pending'
              ? 'warning'
              : 'error'
          }
          size="sm"
        >
          {value}
        </Badge>
      ),
    },
    { key: 'date', label: 'Date', width: '25%' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-text">Design System - Components</h1>

      {/* Buttons Section */}
      <Card>
        <CardHeader title="Buttons" subtitle="Primary, secondary, danger, outline" />
        <CardBody>
          <div className="space-y-4">
            {/* Variants */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">
                Variantes
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">
                Tailles
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">
                États
              </p>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader title="Inputs" subtitle="Text, email, states" />
        <CardBody className="space-y-6">
          <Input
            label="Standard Input"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Input
            label="With Icon"
            placeholder="Search..."
            icon={<Search size={18} />}
          />

          <Input
            label="Error State"
            placeholder="Something's wrong"
            error={true}
            helperText="This field is required"
          />

          <Input
            label="Success State"
            placeholder="All good!"
            success={true}
            helperText="Validation passed"
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            required={true}
          />

          <Input
            label="Disabled Input"
            placeholder="Can't edit this"
            disabled={true}
          />
        </CardBody>
      </Card>

      {/* Card Section */}
      <Card>
        <CardHeader title="Cards" subtitle="Variantes et structures" />
        <CardBody className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="elevated">
              <CardHeader title="Elevated Card" />
              <CardBody>
                <p className="text-text-secondary">
                  This card has an elevated design with shadow effect.
                </p>
              </CardBody>
            </Card>

            <Card variant="bordered">
              <CardHeader title="Bordered Card" />
              <CardBody>
                <p className="text-text-secondary">
                  This card has a bold border style.
                </p>
              </CardBody>
            </Card>

            <Card variant="flat">
              <CardHeader title="Flat Card" />
              <CardBody>
                <p className="text-text-secondary">
                  This card has a flat, minimal design.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="With Footer" />
              <CardBody>
                <p className="text-text-secondary">
                  This card includes a footer section.
                </p>
              </CardBody>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </CardBody>
      </Card>

      {/* Table Section */}
      <Card>
        <CardHeader title="Table" subtitle="Data display with sorting & filtering" />
        <CardBody>
          <Table columns={columns} data={tableData} striped hoverable />
        </CardBody>
      </Card>

      {/* Badge Section */}
      <Card>
        <CardHeader title="Badges" subtitle="Status, tags, labels" />
        <CardBody className="space-y-4">
          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">
              Variantes
            </p>
            <BadgeGroup>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </BadgeGroup>
          </div>

          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">
              Tailles
            </p>
            <BadgeGroup>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </BadgeGroup>
          </div>

          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">
              Avec icône
            </p>
            <BadgeGroup>
              <Badge icon={<Download size={14} />}>Download</Badge>
              <Badge variant="error" icon={<Trash2 size={14} />}>
                Delete
              </Badge>
            </BadgeGroup>
          </div>
        </CardBody>
      </Card>

      {/* Modal Section */}
      <Card>
        <CardHeader title="Modal" subtitle="Dialog & Popups" />
        <CardBody>
          <Button onClick={modalState.open}>Open Modal Demo</Button>

          <Modal
            isOpen={modalState.isOpen}
            onClose={modalState.close}
            title="Example Modal"
            size="md"
            footer={
              <>
                <Button variant="secondary" onClick={modalState.close}>
                  Cancel
                </Button>
                <Button onClick={modalState.close}>Confirm</Button>
              </>
            }
          >
            <div className="space-y-4">
              <p className="text-text-secondary">
                This is an example modal. You can put any content here.
              </p>
              <Input label="Name" placeholder="Enter your name" />
              <Input label="Email" type="email" placeholder="your@email.com" />
            </div>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}
