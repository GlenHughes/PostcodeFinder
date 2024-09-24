"use client"

import { useState } from 'react'
import { Search, MapPin, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from "@/app/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface PostcodeLookupProps {
    lookupAddress: (address: string) => Promise<string[]>;
  }

export default function PostcodeLookup( { lookupAddress }: PostcodeLookupProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) {
      setError('Please enter an address or postcode')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const postcodes = await lookupAddress(query)
      setResults(postcodes)
    } catch (err) {
        console.error(err)
      setError('Failed to fetch postcodes')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Search className="w-16 h-16 text-primary" />
      </motion.div>
      
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter address or postcode"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-500 flex items-center"
            >
              <AlertCircle className="mr-2" />
              {error}
            </motion.div>
          )}

          <AnimatePresence>
            {results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 space-y-2"
              >
                {results.map((postcode, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center p-2 bg-white rounded-md shadow-sm"
                  >
                    <MapPin className="mr-2 text-primary" />
                    {postcode}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}