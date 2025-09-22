"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, ExternalLink, Copy, Link, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

type Item = { slug: string; url: string; createdAt: string; short: string };

export default function Home() {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "loading">("success");
  const [list, setList] = useState<Item[]>([]);

  // Load list dari cookie
  useEffect(() => {
    const saved = Cookies.get("shortlinks");
    if (saved) {
      try {
        setList(JSON.parse(saved));
      } catch {
        setList([]);
      }
    }
  }, []);

  // Simpan list ke cookie
  useEffect(() => {
    Cookies.set("shortlinks", JSON.stringify(list), { expires: 365 });
  }, [list]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setMessage("Membuat short URL...");
    setMessageType("loading");
    
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, custom })
      });
      const j = await res.json();
      
      if (!res.ok) {
        setMessage(j.error || "Terjadi kesalahan");
        setMessageType("error");
        return;
      }
      
      setMessage(`Short URL berhasil dibuat: ${j.short}`);
      setMessageType("success");

      setList(prev => [
        { slug: j.slug, url: j.url, createdAt: j.createdAt, short: j.short },
        ...prev
      ]);

      setUrl("");
      setCustom("");
    } catch {
      setMessage("Kesalahan jaringan, coba lagi");
      setMessageType("error");
    }
  }

  function handleDelete(slug: string) {
    setList(prev => prev.filter(it => it.slug !== slug));
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setMessage("Link telah disalin!");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Link className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ShortURL
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Buat short URL dengan mudah dan simpan di cookie browser
          </p>
        </div>

        {/* Create Form */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Plus className="h-5 w-5" />
              Buat Short URL Baru
            </CardTitle>
            <CardDescription className="text-gray-400">
              Masukkan URL yang ingin dipendekkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url" className="text-white">URL Asli</Label>
                <Input
                  id="url"
                  placeholder="https://contoh.com/path/yang/panjang"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom" className="text-white">Custom Alias (Opsional)</Label>
                <Input
                  id="custom"
                  placeholder="my-custom-link"
                  value={custom}
                  onChange={e => setCustom(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={messageType === "loading"}
              >
                {messageType === "loading" ? "Membuat..." : "Buat Short URL"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Message Alert */}
        {message && (
          <Alert className={`mb-6 ${
            messageType === "success" ? "bg-green-900/20 border-green-800 text-green-400" :
            messageType === "error" ? "bg-red-900/20 border-red-800 text-red-400" :
            "bg-blue-900/20 border-blue-800 text-blue-400"
          }`}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Links List */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Link Kamu ({list.length})
            </CardTitle>
            <CardDescription className="text-gray-400">
              Tersimpan di cookie browser
            </CardDescription>
          </CardHeader>
          <CardContent>
            {list.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Link className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada link yang dibuat</p>
                <p className="text-sm">Buat link pertama Anda di atas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {list.map((item, index) => (
                  <div key={item.slug}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <a 
                            href={item.short} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-medium truncate flex items-center gap-1"
                          >
                            {item.short}
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(item.short)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className="text-gray-300 text-sm truncate mb-2">
                          → {item.url}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.slug)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 self-start sm:self-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {index < list.length - 1 && <Separator className="bg-gray-800" />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Data disimpan secara lokal di browser Anda</p>
        </div>
      </div>
    </div>
  );
}
