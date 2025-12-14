"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthenticatedLayout from "@/components/authenticated-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon, X, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const SUGGESTED_TAGS = [
  'Product', 'Design', 'Engineering', 'Marketing', 'Growth',
  'AI/ML', 'Leadership', 'Startup', 'SaaS', 'Strategy',
  'Fundraising', 'Product Management', 'Development', 'UX/UI',
];

export default function CreatePostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addTag = (tag: string) => {
    if (tags.length >= 5) {
      toast.error("Maximum 5 tags allowed");
      return;
    }
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addCustomTag = () => {
    if (!customTag.trim()) return;
    if (tags.length >= 5) {
      toast.error("Maximum 5 tags allowed");
      return;
    }
    if (!tags.includes(customTag.trim())) {
      setTags([...tags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Please write something to share");
      return;
    }

    if (tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Post created successfully!");
      router.push('/explore');
    }, 1500);
  };

  return (
    <AuthenticatedLayout>
      <div className="w-full h-[calc(100vh-4rem)] lg:h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/create">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Create
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Create Post</CardTitle>
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Share your insights, projects, or learnings with the professional community
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Author Info */}
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={session?.user?.image || ''} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{session?.user?.name}</p>
                    <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, insights, or showcase your work... What have you learned? What are you building?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {content.length} characters
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Image (Optional)</Label>
                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-border">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm font-medium mb-1">Click to upload image</p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <div>
                    <Label>Tags * (Select up to 5)</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Help others discover your post by adding relevant tags
                    </p>
                  </div>

                  {/* Suggested Tags */}
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_TAGS.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          tags.includes(tag) ? "bg-primary" : "hover:bg-primary/10"
                        }`}
                        onClick={() => tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                      >
                        {tag}
                        {tags.includes(tag) && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>

                  {/* Custom Tag Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add custom tag..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                      maxLength={20}
                    />
                    <Button type="button" variant="outline" onClick={addCustomTag}>
                      Add
                    </Button>
                  </div>

                  {/* Selected Tags */}
                  {tags.length > 0 && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium mb-2">Selected tags ({tags.length}/5):</p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="default" className="pr-1">
                            {tag}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-auto p-1 ml-1"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3 text-white" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Guidelines */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium mb-2 text-primary">Content Guidelines</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>✓ Share professional insights, projects, or learnings</li>
                    <li>✓ Be authentic and provide value to the community</li>
                    <li>✗ No entertainment, memes, or off-topic content</li>
                    <li>✗ No spam or promotional content without context</li>
                  </ul>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Publishing...' : 'Publish Post'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    asChild
                  >
                    <Link href="/create">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
