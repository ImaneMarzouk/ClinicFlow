import { format, parseISO } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '-';
  try {
    return format(parseISO(date), 'dd/MM/yyyy');
  } catch {
    return '-';
  }
};

export const formatDateTime = (date) => {
  if (!date) return '-';
  try {
    return format(parseISO(date), 'dd/MM/yyyy HH:mm');
  } catch {
    return '-';
  }
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusBadge = (status) => {
  const badges = {
    pending: '🟡 Pending',
    confirmed: '🟢 Confirmed',
    cancelled: '🔴 Cancelled',
  };
  return badges[status] || status;
};

export const formatCIN = (cin) => {
  if (!cin) return '-';
  return cin.toUpperCase();
};