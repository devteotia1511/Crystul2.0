'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Maximize2, Minimize2, Paperclip, Send, Smile, Search, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    avatar: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=random',
    lastMessage: 'Hi there! How are you?',
    time: '2m',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=random',
    lastMessage: 'See you tomorrow!',
    time: '1h',
    unread: 0,
    isOnline: true,
  },
  {
    id: '3',
    name: 'Team Crystul',
    avatar: 'https://ui-avatars.com/api/?name=Team+Crystul&background=random',
    lastMessage: 'Meeting at 3 PM today',
    time: '5h',
    unread: 5,
    isOnline: false,
  },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    { id: 1, text: 'Hello!', sender: 'them', time: '2:00 PM', read: true },
    { id: 2, text: 'Hi! How are you?', sender: 'me', time: '2:01 PM', read: true },
    { id: 3, text: 'I\'m doing well, thank you! How about you?', sender: 'them', time: '2:05 PM', read: true },
    { id: 4, text: 'How is the project going?', sender: 'them', time: '2:05 PM', read: true },
    { id: 5, text: 'Going great! Just doing some coding now.', sender: 'me', time: '2:10 PM', read: true },
    { id: 6, text: 'That\'s great! What are you working on?', sender: 'them', time: '2:15 PM', read: true },
  ],
  '2': [
    { id: 1, text: 'Hi Priya!', sender: 'me', time: '9:00 AM', read: true },
    { id: 2, text: 'Hello! How are you?', sender: 'them', time: '9:30 AM', read: true },
    { id: 3, text: 'See you tomorrow!', sender: 'them', time: '10:00 AM', read: true },
  ],
  '3': [
    { id: 1, text: 'Welcome to Team Crystul!', sender: 'them', time: '1:00 PM', read: true },
    { id: 2, text: 'Thank you! Happy to be here.', sender: 'me', time: '1:30 PM', read: true },
    { id: 3, text: 'We have a meeting today at 3 PM', sender: 'them', time: '2:00 PM', read: false },
  ],
};

export default function InstagramChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set first contact as active by default
  useEffect(() => {
    if (contacts.length > 0 && !activeContact) {
      setActiveContact(contacts[0].id);
    }
  }, [contacts, activeContact]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeContact) return;
    
    const newMessage: Message = {
      id: messages[activeContact] ? messages[activeContact].length + 1 : 1,
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    
    setMessages(prev => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMessage]
    }));
    
    // Update last message in contacts
    setContacts(prev => 
      prev.map(contact => 
        contact.id === activeContact 
          ? { 
              ...contact, 
              lastMessage: message,
              time: 'Just now',
              unread: 0 
            } 
          : contact
      )
    );
    
    setMessage('');
    
    // Simulate reply
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const replies = [
          'Got it, thanks!',
          'I see, interesting!',
          'Let me check and get back to you.',
          'Sounds good!',
          'Thanks for letting me know!',
        ];
        
        const reply: Message = {
          id: messages[activeContact] ? messages[activeContact].length + 2 : 1,
          text: replies[Math.floor(Math.random() * replies.length)],
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        };
        
        setMessages(prev => ({
          ...prev,
          [activeContact]: [...(prev[activeContact] || []), reply]
        }));
        
        // Update last message in contacts
        setContacts(prev => 
          prev.map(contact => 
            contact.id === activeContact 
              ? { 
                  ...contact, 
                  lastMessage: reply.text,
                  time: 'Just now',
                  unread: contact.id === activeContact ? 0 : (contact.unread + 1)
                } 
              : contact
          )
        );
      }, 1000 + Math.random() * 3000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeContact]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactClick = (contactId: string) => {
    setActiveContact(contactId);
    // Mark messages as read
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, unread: 0 } 
          : contact
      )
    );
    
    // Mark messages as read in the messages object
    if (messages[contactId]) {
      setMessages(prev => ({
        ...prev,
        [contactId]: prev[contactId].map(msg => ({ ...msg, read: true }))
      }));
    }
    
    // Focus input after clicking a contact
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  const activeContactData = contacts.find(c => c.id === activeContact);

  return (
    <div className={`fixed ${isExpanded ? 'bottom-0 right-0 w-full h-screen max-w-5xl' : 'bottom-6 right-6 w-[800px] h-[600px]'} bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden z-50`}>
      <div className="flex h-full">
        {/* Contacts sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-full hover:bg-gray-100">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Contacts list */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => handleContactClick(contact.id)}
                className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeContact === contact.id ? 'bg-blue-50' : ''}`}
              >
                <div className="relative mr-3">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
                {contact.unread > 0 && (
                  <div className="ml-2 bg-primary text-white text-xs font-medium h-5 w-5 rounded-full flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
            {filteredContacts.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                No conversations found
              </div>
            )}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {activeContact ? (
            <>
              {/* Chat header */}
              <div className="p-3 border-b border-gray-200 bg-white flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={activeContactData?.avatar} 
                    alt={activeContactData?.name} 
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="text-sm font-medium">{activeContactData?.name}</h3>
                    <p className="text-xs text-gray-500">
                      {activeContactData?.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    aria-label={isExpanded ? 'Minimize' : 'Maximize'}
                  >
                    {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[activeContact]?.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs rounded-2xl px-4 py-2 ${msg.sender === 'me' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 shadow-sm rounded-tl-none'}`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 text-right ${msg.sender === 'me' ? 'text-primary-100' : 'text-gray-500'}`}>
                        {msg.time} {msg.sender === 'me' && (msg.read ? '✓✓' : '✓')}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
                <div className="flex items-center gap-2">
                  <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Message..."
                      className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Smile size={20} />
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    className="p-2 text-primary hover:bg-primary/10 rounded-full"
                    disabled={!message.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
