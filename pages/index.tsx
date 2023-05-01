import { Box, Button, Image, Heading, Center, Stack } from '@chakra-ui/react'

import Link from '@/components/Link'
import logo from '../assets/logo.svg'

export default function Home() {
  return (
    <Box my="25vh">
      <Center my="auto">
        <Stack spacing={5}>
          <Image 
            src={logo.src}
            alt="Shortwave Logo"
            height={125}
          />
          <Heading size="lg">
            Welcome to Shortwave
          </Heading>
          <Link 
            href="/discover"
            as={Center}
          >
            <Button
              rounded="full"
              colorScheme="blue"
              width={60}
              py={6}
            >
              Discover New Stations
            </Button>
          </Link>
        </Stack>
      </Center>
    </Box>
  )
}
