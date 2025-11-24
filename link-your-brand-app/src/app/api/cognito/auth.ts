import {
  SignUpCommand,
  InitiateAuthCommand,
  GetUserCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { cognitoClient } from './client'

export async function signUp(email: string, password: string) {
  const command = new SignUpCommand({
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email }
    ]
  })
  
  try {
    const response = await cognitoClient.send(command)
    return {
      success: true,
      userSub: response.UserSub,
      message: 'Sign up successful! Please check your email to verify.'
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to sign up'
    }
  }
}

export async function signIn(email: string, password: string) {
  const command = new InitiateAuthCommand({
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  })
  
  try {
    const response = await cognitoClient.send(command)
    
    if (!response.AuthenticationResult) {
      throw new Error('Authentication failed')
    }
    
    return {
      success: true,
      accessToken: response.AuthenticationResult.AccessToken,
      idToken: response.AuthenticationResult.IdToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
      expiresIn: response.AuthenticationResult.ExpiresIn
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Sign in failed'
    }
  }
}

export async function getUser(accessToken: string) {
  const command = new GetUserCommand({
    AccessToken: accessToken
  })
  
  try {
    const response = await cognitoClient.send(command)
    
    const attributes = response.UserAttributes?.reduce((acc, attr) => {
      if (attr.Name && attr.Value) {
        acc[attr.Name] = attr.Value
      }
      return acc
    }, {} as Record<string, string>)
    
    return {
      success: true,
      username: response.Username,
      attributes
    }
  } catch (error: any) {
    return {
      success: false,
      error: 'Invalid or expired token'
    }
  }
}