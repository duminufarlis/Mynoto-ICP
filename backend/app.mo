import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";


actor {

  type NoteId = Nat;

  type Note = {
  id: NoteId;
  title: Text;
  content: Text;
  createdAt: Time.Time;
  updatedAt: Time.Time;
};


  private stable var nextNoteId : NoteId = 0;
  private stable var notes : [(NoteId, Note)] = [];

  // Internal map supaya efisien (tidak harus dari List)
  private var noteMap = HashMap.fromIter<NoteId, Note>(
    notes.vals(),
    10,
    Nat.equal,
    Hash.hash
  );

  // Tambah ide baru
  public func addNote(title: Text, content: Text) : async NoteId {
  let now = Time.now();
  let note : Note = {
    id = nextNoteId;
    title = title;
    content = content;
    createdAt = now;
    updatedAt = now;
  };
  noteMap.put(nextNoteId, note);
  nextNoteId += 1;
  return nextNoteId - 1;
};

  // Ambil semua ide (catatan)
  public query func getAllNotes() : async [Note] {
    Iter.toArray(Iter.map(noteMap.vals(), func (n: Note) : Note { n }))
  };

  // Ambil ide berdasarkan ID
  public query func getNote(id : NoteId) : async ?Note {
    noteMap.get(id)
  };

  

  // Update ide
  public func updateNote(id : NoteId, title: Text, content : Text) : async Bool {
  switch(noteMap.get(id)) {
    case(null) { return false; };
    case(?oldNote) {
      let now = Time.now();
      let updatedNote = {
        id = oldNote.id;
        title = title;
        content = content;
        createdAt = oldNote.createdAt;
        updatedAt = now;
      };
      noteMap.put(id, updatedNote);
      return true;
    };
  }
};

  // Hapus ide
  public func deleteNote(id : NoteId) : async Bool {
  switch (noteMap.get(id)) {
    case (?_) {
      ignore noteMap.remove(id);
      true;
    };
    case (_) { false };
  }
};

  // Persist data saat upgrade canister
  system func preupgrade() {
    notes := Iter.toArray(noteMap.entries());
  };

  system func postupgrade() {
    noteMap := HashMap.fromIter<NoteId, Note>(
      notes.vals(),
      10,
      Nat.equal,
      Hash.hash
    );
  };
}
