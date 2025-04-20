import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem('username', username)
  } catch (error) {
    console.error('Error storing username:', error)
  }
}

export const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem('username')
    return username
  } catch (error) {
    console.error('Error retrieving username:', error)
    return null
  }
}
