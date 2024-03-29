export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'Search',
    route: '/events/find',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  eventLatitude: '',
  eventLongitude: '',
  imageUrl: '',
  date: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}

export const searchEventDefaultValues = {
  date: new Date(),
  userLatitude: '',
  userLongitude: '',
}