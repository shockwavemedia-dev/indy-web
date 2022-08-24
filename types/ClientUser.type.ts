export type ClientUser = {
  id: number
  email: string
  status: 'active' | 'deleted' | 'guest' | 'inactive' | 'invited' | 'revoked'
  fullName: string
  firstName: string
  middleName: string
  lastName: string
  contactNumber: string
  gender: 'female' | 'male'
  birthDate: Date
  userType: {
    id: number
    type: 'admin_users' | 'client_users' | 'lead_client'
    role: 'marketing' | 'marketing manager' | 'group manager'
    client: {
      id: number
      name: string
      clientCode: string
      address: string
      phone: string
      timezone: string
      clientSince: Date
      mainClientId: number
      overview: string
      rating: number
      status: 'active' | 'inactive' | 'deleted'
      createdAt: Date
      updatedAt: Date
      deletedAt: Date
      logoFileId: number
      designatedDesignerId: number
      ownerId: number
    }
  }
}
